import Taro from '@tarojs/taro';
import { View, Image, Canvas, ScrollView } from '@tarojs/components';

import './index.scss';
export interface ICropperProps {
    imgSrc: string; //图片路径 
    hideBox?: boolean; //隐藏拖动的box
    outputFileType?: string; //可选。目标文件的类型。默认值为jpg，jpg：输出jpg格式图片；png：输出png格式图片
    quality?: number; //可选。图片的质量。默认值为1，即最高质量。目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。
    aspectRatio?: number; //可选。裁剪的宽高比，默认null，即不限制剪裁宽高比。aspectRatio需大于0
    minBoxWidthRatio?: number; //可选。最小剪裁尺寸与原图尺寸的比率，默认0.15，即宽度最小剪裁到原图的0.15宽。
    minBoxHeightRatio?: number; //可选。同minBoxWidthRatio，当设置aspectRatio时，_minBoxHeight值设置无效。_minBoxHeight值由_minBoxWidth 和 aspectRatio自动计算得到。
    initialBoxWidthRatio?: number; //可选。剪裁框初始大小比率。默认值0.6，即剪裁框默认宽度为图片宽度的0.6倍。
    initialBoxHeightRatio?: number; //可选。同initialBoxWidthRatio，当设置aspectRatio时，initialBoxHeightRatio值设置无效。initialBoxHeightRatio值由initialBoxWidthRatio 和 aspectRatio自动计算得到。
    onCropCallback?: (isSuccess: boolean, value: any) => void; //裁剪回调
}

export interface ICropperState {
    imgSrc: string;
    tempImgSrc: string; //图片本地路径
    hideBox: boolean;
    outputFileType: string;
    quality: number;
    aspectRatio?: number;
    minBoxWidthRatio: number;
    minBoxHeightRatio: number;
    initialBoxWidthRatio: number;
    initialBoxHeightRatio: number;

    stageLeft: number;
    stageTop: number;
    stageWidth: number;
    stageHeight: number;

    boxWidth: number;
    boxHeight: number;
    boxLeft: number;
    boxTop: number;

    canvasWidth: number;
    canvasHeight: number;

    scrollTop: number; //滚动条高度
}

const debug = false;

const fnLog = function (msg) {
    if (debug) {
        console.log(msg);
    }
};

export default class Cropper extends Taro.Component<ICropperProps, ICropperState> {
    private _canvasContext: any;
    private _minBoxWidth = 0;
    private _minBoxHeight = 0;

    private _touchStartBoxLeft = 0;
    private _touchStartBoxTop = 0;
    private _touchStartBoxWidth = 0;
    private _touchStartBoxHeight = 0;

    private _touchStartX = 0;
    private _touchStartY = 0;

    private _touchScrollStartY = 0;
    private _touchScrollEndY = 0;

    private _imageStageRatio = 1; //图片实际尺寸与剪裁舞台大小的比值，用于尺寸换算。
    private _pixelRatio = 1; //todo设备像素密度//暂不使用//

    constructor(props: ICropperProps) {
        super(props);

        this.state = {
            hideBox: !!props.hideBox,
            imgSrc: props.imgSrc,
            tempImgSrc: '',
            outputFileType: props.outputFileType || 'jpg',
            quality: props.quality || 1,
            aspectRatio: props.aspectRatio,
            minBoxWidthRatio: props.minBoxWidthRatio || 0.1,
            minBoxHeightRatio: props.minBoxHeightRatio || 0.1,
            initialBoxWidthRatio: props.initialBoxWidthRatio || 0.5,
            initialBoxHeightRatio: props.initialBoxHeightRatio || 0.5,

            stageLeft: 0,
            stageTop: 0,
            stageWidth: 0,
            stageHeight: 0,

            boxWidth: 0,
            boxHeight: 0,
            boxLeft: 0,
            boxTop: 0,

            canvasWidth: 0,
            canvasHeight: 0,

            scrollTop: 0,
        };
    }

    public componentDidMount() {
        this.fnInit();
    }

    public componentWillReceiveProps(nextProps: ICropperProps) {
        if (nextProps.hideBox === this.state.hideBox) {
            return;
        }

        this.setState({
            hideBox: !!nextProps.hideBox,
        });
    }

    public fnInit() {
        const { imgSrc, minBoxWidthRatio, minBoxHeightRatio, initialBoxWidthRatio, initialBoxHeightRatio, aspectRatio } = this.state;
        const _self = this;

        Taro.createSelectorQuery()
            .in(this.$scope)
            .select('.crop-layout').context(res => {

                this._canvasContext = res.context || Taro.createCanvasContext('cropCanvas', this.$scope);

                Taro.createSelectorQuery()
                    .in(this.$scope)
                    .select('.crop-layout')
                    .boundingClientRect(function (rect) {
                        fnLog(rect);
                        // const layoutLeft = rect.left;
                        // const layoutTop = rect.top;
                        const layoutWidth = rect.width;
                        const layoutHeight = rect.height;

                        fnLog(imgSrc);

                        Taro.getImageInfo({
                            src: imgSrc,
                            success: function (imageInfo) {
                                fnLog(imageInfo);
                                const fileType = imageInfo.type;
                                const tempImgSrc = imageInfo.path;
                                const imageWidth = imageInfo.width;
                                const imageHeight = imageInfo.height;

                                const imageWH = imageWidth / imageHeight;

                                let stageWidth = 0;
                                let stageHeight = 0;

                                //stageWidth宽始终是layout的宽度
                                stageWidth = layoutWidth;
                                stageHeight = layoutWidth / imageWH;
                                _self._imageStageRatio = imageHeight / stageHeight;

                                const stageLeft = (layoutWidth - stageWidth) / 2;
                                const stageTop = (layoutHeight - stageHeight) / 2;

                                _self._minBoxWidth = stageWidth * minBoxWidthRatio;
                                _self._minBoxHeight = stageHeight * minBoxHeightRatio;

                                let boxWidth = stageWidth * initialBoxWidthRatio;
                                let boxHeight = stageHeight * initialBoxHeightRatio;

                                if (aspectRatio) {
                                    boxHeight = boxWidth / aspectRatio;
                                    if (boxHeight > stageHeight) {
                                        boxHeight = stageHeight;
                                        boxWidth = boxHeight * aspectRatio;
                                    }
                                }

                                const boxLeft = (stageWidth - boxWidth) / 2;
                                const boxTop = (stageHeight - boxHeight) / 2;

                                _self.setState({
                                    tempImgSrc: tempImgSrc,
                                    canvasWidth: imageWidth * _self._pixelRatio,
                                    canvasHeight: imageHeight * _self._pixelRatio,
                                    stageLeft: stageLeft,
                                    stageTop: stageTop,
                                    stageWidth: stageWidth,
                                    stageHeight: stageHeight,
                                    boxWidth: boxWidth,
                                    boxHeight: boxHeight,
                                    boxLeft: boxLeft,
                                    boxTop: boxTop,
                                    outputFileType: _self.props.outputFileType || fileType,
                                });
                            },
                        });
                    }).exec();
            }).exec();
    }

    public fnTouchStart(e) {
        fnLog('start');
        fnLog(e);

        const _self = this;

        const touch = e.touches[0];
        const pageX = touch.pageX;
        const pageY = touch.pageY;

        this._touchStartX = pageX;
        this._touchStartY = pageY;

        this._touchScrollStartY = pageY;

        this._touchStartBoxLeft = _self.state.boxLeft;
        this._touchStartBoxTop = _self.state.boxTop;
        this._touchStartBoxWidth = _self.state.boxWidth;
        this._touchStartBoxHeight = _self.state.boxHeight;
    }

    public fnTouchMove(e) {
        fnLog('move');
        fnLog(e);

        e.stopPropagation();
        const _self = this;
        const { stageWidth, stageHeight, aspectRatio, scrollTop } = this.state;
        const targetId = e.target.id;
        const touch = e.touches[0];
        const pageX = touch.pageX;
        const pageY = touch.pageY;

        const offsetX = pageX - this._touchStartX;
        let offsetY = pageY - this._touchStartY;

        if (targetId === 'box') {
            let newBoxLeft = this._touchStartBoxLeft + offsetX;
            let newBoxTop = this._touchStartBoxTop + offsetY;

            if (newBoxLeft < 0) {
                newBoxLeft = 0;
            }
            if (newBoxTop < 0) {
                newBoxTop = 0;
            }
            if (newBoxLeft + this._touchStartBoxWidth > stageWidth) {
                newBoxLeft = stageWidth - this._touchStartBoxWidth;
            }
            if (newBoxTop + this._touchStartBoxHeight > stageHeight) {
                newBoxTop = stageHeight - this._touchStartBoxHeight;
            }
            _self.setState({
                boxLeft: newBoxLeft,
                boxTop: newBoxTop,
            });
        } else if (targetId === 'lt') {
            if (aspectRatio) {
                offsetY = offsetX / aspectRatio;
            }

            let newBoxLeft = this._touchStartBoxLeft + offsetX;
            let newBoxTop = this._touchStartBoxTop + offsetY;

            if (newBoxLeft < 0) {
                newBoxLeft = 0;
            }
            if (newBoxTop < 0) {
                newBoxTop = 0;
            }

            if (this._touchStartBoxLeft + this._touchStartBoxWidth - newBoxLeft < this._minBoxWidth) {
                newBoxLeft = this._touchStartBoxLeft + this._touchStartBoxWidth - this._minBoxWidth;
            }
            if (this._touchStartBoxTop + this._touchStartBoxHeight - newBoxTop < this._minBoxHeight) {
                newBoxTop = this._touchStartBoxTop + this._touchStartBoxHeight - this._minBoxHeight;
            }

            let newBoxWidth = this._touchStartBoxWidth - (newBoxLeft - this._touchStartBoxLeft);
            let newBoxHeight = this._touchStartBoxHeight - (newBoxTop - this._touchStartBoxTop);

            //约束比例
            if (aspectRatio) {
                if (newBoxTop === 0 && newBoxLeft !== 0) {
                    newBoxWidth = newBoxHeight * aspectRatio;
                    newBoxLeft = this._touchStartBoxWidth - newBoxWidth + this._touchStartBoxLeft;
                }
                if (newBoxLeft === 0) {
                    newBoxHeight = newBoxWidth / aspectRatio;
                    newBoxTop = this._touchStartBoxHeight - newBoxHeight + this._touchStartBoxTop;
                }

                if (newBoxWidth === this._minBoxWidth) {
                    newBoxHeight = newBoxWidth / aspectRatio;
                    newBoxTop = this._touchStartBoxHeight - newBoxHeight + this._touchStartBoxTop;
                }
            }


            _self.setState({
                boxTop: newBoxTop,
                boxLeft: newBoxLeft,
                boxWidth: newBoxWidth,
                boxHeight: newBoxHeight,
            });
        } else if (targetId === 'rt') {
            if (aspectRatio) {
                offsetY = -offsetX / aspectRatio;
            }

            let newBoxWidth = this._touchStartBoxWidth + offsetX;
            if (newBoxWidth < this._minBoxWidth) {
                newBoxWidth = this._minBoxWidth;
            }
            if (this._touchStartBoxLeft + newBoxWidth > stageWidth) {
                newBoxWidth = stageWidth - this._touchStartBoxLeft;
            }

            let newBoxTop = this._touchStartBoxTop + offsetY;

            if (newBoxTop < 0) {
                newBoxTop = 0;
            }

            if (this._touchStartBoxTop + this._touchStartBoxHeight - newBoxTop < this._minBoxHeight) {
                newBoxTop = this._touchStartBoxTop + this._touchStartBoxHeight - this._minBoxHeight;
            }
            let newBoxHeight = this._touchStartBoxHeight - (newBoxTop - this._touchStartBoxTop);

            //约束比例
            if (aspectRatio) {
                if (newBoxTop === 0 && newBoxWidth !== stageWidth - this._touchStartBoxLeft) {
                    newBoxWidth = newBoxHeight * aspectRatio;
                }

                if (newBoxWidth === stageWidth - this._touchStartBoxLeft) {
                    newBoxHeight = newBoxWidth / aspectRatio;
                    newBoxTop = this._touchStartBoxHeight - newBoxHeight + this._touchStartBoxTop;
                }

                if (newBoxWidth === this._minBoxWidth) {
                    newBoxHeight = newBoxWidth / aspectRatio;
                    newBoxTop = this._touchStartBoxHeight - newBoxHeight + this._touchStartBoxTop;
                }
            }


            _self.setState({
                boxTop: newBoxTop,
                boxHeight: newBoxHeight,
                boxWidth: newBoxWidth,
            });
        } else if (targetId === 'lb') {
            if (aspectRatio) {
                offsetY = -offsetX / aspectRatio;
            }
            let newBoxLeft = this._touchStartBoxLeft + offsetX;

            if (newBoxLeft < 0) {
                newBoxLeft = 0;
            }
            if (this._touchStartBoxLeft + this._touchStartBoxWidth - newBoxLeft < this._minBoxWidth) {
                newBoxLeft = this._touchStartBoxLeft + this._touchStartBoxWidth - this._minBoxWidth;
            }

            let newBoxWidth = this._touchStartBoxWidth - (newBoxLeft - this._touchStartBoxLeft);

            let newBoxHeight = this._touchStartBoxHeight + offsetY;
            if (newBoxHeight < this._minBoxHeight) {
                newBoxHeight = this._minBoxHeight;
            }
            if (this._touchStartBoxTop + newBoxHeight > stageHeight) {
                newBoxHeight = stageHeight - this._touchStartBoxTop;
            }

            //约束比例
            if (aspectRatio) {
                if (newBoxHeight === stageHeight - this._touchStartBoxTop && newBoxLeft !== 0) {
                    newBoxWidth = newBoxHeight * aspectRatio;
                    newBoxLeft = this._touchStartBoxWidth - newBoxWidth + this._touchStartBoxLeft;
                }
                if (newBoxLeft === 0) {
                    newBoxHeight = newBoxWidth / aspectRatio;
                }

                if (newBoxWidth === this._minBoxWidth) {
                    newBoxHeight = newBoxWidth / aspectRatio;
                }
            }


            _self.setState({
                boxLeft: newBoxLeft,
                boxWidth: newBoxWidth,
                boxHeight: newBoxHeight,
            });
        } else if (targetId === 'rb') {
            if (aspectRatio) {
                offsetY = offsetX / aspectRatio;
            }
            let newBoxWidth = this._touchStartBoxWidth + offsetX;
            if (newBoxWidth < this._minBoxWidth) {
                newBoxWidth = this._minBoxWidth;
            }
            if (this._touchStartBoxLeft + newBoxWidth > stageWidth) {
                newBoxWidth = stageWidth - this._touchStartBoxLeft;
            }

            let newBoxHeight = this._touchStartBoxHeight + offsetY;
            if (newBoxHeight < this._minBoxHeight) {
                newBoxHeight = this._minBoxHeight;
            }
            if (this._touchStartBoxTop + newBoxHeight > stageHeight) {
                newBoxHeight = stageHeight - this._touchStartBoxTop;
            }

            //约束比例
            if (aspectRatio) {
                if (newBoxHeight === stageHeight - this._touchStartBoxTop && newBoxWidth !== stageWidth - this._touchStartBoxLeft) {
                    newBoxWidth = newBoxHeight * aspectRatio;
                }

                if (newBoxWidth === stageWidth - this._touchStartBoxLeft) {
                    newBoxHeight = newBoxWidth / aspectRatio;
                }

                if (newBoxWidth === this._minBoxWidth) {
                    newBoxHeight = newBoxWidth / aspectRatio;
                }
            }


            _self.setState({
                boxWidth: newBoxWidth,
                boxHeight: newBoxHeight,
            });
        } else if (targetId === 'stage') {
            //滚动画布
            const touch = e.touches[0];
            const pageY = touch.pageY;
            const offsetY = pageY - this._touchScrollStartY;

            const newScrollTop = scrollTop - offsetY;
            const minScrollTop = 0;
            const maxScrollTop = stageHeight - stageWidth;

            this.setState({
                scrollTop: newScrollTop < minScrollTop ? minScrollTop : (newScrollTop > maxScrollTop ? maxScrollTop : newScrollTop),
            }, () => {
                this._touchScrollStartY = pageY;
            });
        }
    }

    public fnTouchEnd(e) {
        e.stopPropagation();
        fnLog('end');
    }

    public fnTouchCancel(e) {
        fnLog('cancel');
        e.stopPropagation();
    }

    public fnCrop(opts) {
        const _self = this;

        let _success = function () { };
        let _fail = function () { };
        let _complete = function () { };

        if (opts.success !== null) {
            _success = opts.success;
        }
        if (opts.fail !== null) {
            _fail = opts.fail;
        }
        if (opts.complete !== null) {
            _complete = opts.complete;
        }

        const imagePath = _self.state.tempImgSrc;
        const boxLeft = _self.state.boxLeft;
        const boxTop = _self.state.boxTop;
        const boxWidth = _self.state.boxWidth;
        const boxHeight = _self.state.boxHeight;

        const sx = Math.ceil(boxLeft * this._imageStageRatio);
        const sy = Math.ceil(boxTop * this._imageStageRatio);

        const sWidth = Math.ceil(boxWidth * this._imageStageRatio);
        const sHeight = Math.ceil(boxHeight * this._imageStageRatio);
        const dx = 0;
        const dy = 0;

        const dWidth = Math.ceil(sWidth * this._pixelRatio);
        const dHeight = Math.ceil(sHeight * this._pixelRatio);

        const outputFileType = this.state.outputFileType as any;
        const quality = this.state.quality;

        fnLog({ imagePath, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight });

        this._canvasContext.drawImage(imagePath, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        this._canvasContext.draw(true, function () {
            Taro.canvasToTempFilePath(
                {
                    x: dx,
                    y: dy,
                    width: dWidth,
                    height: dHeight,
                    destWidth: sWidth,
                    destHeight: sHeight,
                    canvasId: 'cropCanvas',
                    fileType: outputFileType,
                    quality: quality,
                    success: _success,
                    fail: _fail,
                    complete: _complete,
                },
                _self.$scope,
            );
        });
    }

    public onEnterCrop = (e: any) => {
        e.stopPropagation();
        const { onCropCallback } = this.props;

        this.fnCrop({
            success: (res: any) => {
                if (onCropCallback) {
                    onCropCallback(true, res.tempFilePath);
                }
            },
            fail: (err: any) => {
                if (onCropCallback) {
                    onCropCallback(false, err);
                }
            },
        });
    }

    public render() {
        const { onCropCallback } = this.props;
        const { imgSrc, stageWidth, stageHeight, stageLeft, stageTop, canvasWidth, canvasHeight, boxWidth, boxHeight, boxLeft, boxTop, hideBox, scrollTop } = this.state;
        const borderWidth = 2;
        const lTop = { x: (boxLeft + borderWidth) / stageWidth, y: (boxTop + borderWidth) / stageHeight };
        const rTop = { x: (boxLeft + boxWidth - borderWidth) / stageWidth, y: (boxTop + borderWidth) / stageHeight };
        const lBottom = { x: (boxLeft + borderWidth) / stageWidth, y: (boxTop + boxHeight - borderWidth) / stageHeight };
        const rBottom = { x: (boxLeft + boxWidth - borderWidth) / stageWidth, y: (boxTop + boxHeight - borderWidth) / stageHeight };
        const imgStyle = `width:100vw;height:${100 / (stageWidth / stageHeight)}vw;`;
        const clipStyle = hideBox ? 'opacity: 0.5;' : `clip-path: polygon(${lTop.x * 100}% ${lTop.y * 100}%, ${rTop.x * 100}% ${rTop.y * 100}%, ${rBottom.x * 100}% ${rBottom.y * 100}%, ${lBottom.x * 100}% ${lBottom.y * 100}%);`;
        const enterStyle = `display:${onCropCallback ? 'block' : 'none'}`;
        const boxHideStyle = `z-index:${hideBox ? '-1' : '0'}`;
        const isHeightLarge = stageHeight > stageWidth;
        const imgStyle1 = isHeightLarge ? 'top: 0;' : `top: ${stageTop}px;`;

        fnLog({ stageWidth, stageHeight });
        return (
            <ScrollView className='crop-layout' scrollY={hideBox ? false : true} scroll-top={scrollTop} >
                {/* 实现裁剪框高亮效果 */}
                <Image id='image' className='image' src={imgSrc} style={`${clipStyle}${imgStyle}${imgStyle1}`} mode='widthFix'></Image>
                <Image id='image_mask' className='mask-image' src={imgSrc} style={imgStyle1} mode='widthFix'></Image>

                <View
                    className='stage'
                    id='stage'
                    style={`width:${stageWidth}px;height:${stageHeight}px;left:${stageLeft}px;top:${isHeightLarge ? 0 : stageTop}px;`}
                    onTouchStart={this.fnTouchStart}
                    onTouchMove={this.fnTouchMove}
                    onTouchEnd={this.fnTouchEnd}
                    onTouchCancel={this.fnTouchCancel}
                >

                    <View id='box' className='box' style={`width:${boxWidth}px;height:${boxHeight}px;left:${boxLeft}px;top:${boxTop}px;${boxHideStyle}`}>
                        <View id='lt' className='lt'></View>
                        <View id='lb' className='lb'></View>
                        <View id='rt' className='rt'></View>
                        <View id='rb' className='rb'></View>

                        <View className='icon-enter' style={enterStyle} onClick={this.onEnterCrop}></View>

                    </View>
                </View>

                <Canvas canvasId='cropCanvas' style={`height:${canvasHeight}px;width:${canvasWidth}px;position:fixed;background-color:red;left:5000rpx;`}></Canvas>

            </ScrollView>
        );
    }
}
