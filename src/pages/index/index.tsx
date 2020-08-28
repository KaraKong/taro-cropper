import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'
import Cropper from '../../components/cropper';

export default class Index extends Component<any, any> {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '首页'
    }

    private _imgCropper: any;

    public componentDidMount() {
        // this.genRandomData();
    }

    public genRandomData = () => {
        const rand = Math.ceil(Math.random() * 10);
        this.setState({
            temp: `sss_${rand}`,
        });
    }

    public onUploadPhoto() {
        const _self = this;
        Taro.chooseImage({
            success: function (res: any) {
                console.log(res);
                const tempFilePaths = res.tempFilePaths;
                _self.setState({
                    imgSrc: tempFilePaths[0],
                });
            },
        });
    }

    public onCropImg = () => {
        if (!this._imgCropper) {
            return;
        }
        this._imgCropper.fnCrop({
            success: (res: any) => {
                console.log(res);
                this.setState({
                    cropImg: res.tempFilePath,
                });
            },
            fail: (err: any) => {
                console.log(err);
            },
        });
    }

    public onGoOn = () => {
        Taro.navigateTo({
            url: '/pages/testt/test',
        });
    }


    public render() {
        const { cropImg, imgSrc, temp } = this.state;

        return (
            <View style={{ position: 'fixed', top: '0px' }}>
                {
                    <View className='ss' style={{ fontSize: '26px' }}>{temp}</View>
                }

                {
                    imgSrc && <Cropper imgSrc={imgSrc} ref={(ele) => this._imgCropper = ele} />
                }
                <Button onClick={this.onUploadPhoto}>上传图片</Button>
                <Button onClick={this.onCropImg}>确定</Button>

                {/* <Button onClick={this.onGoOn}>下一步</Button> */}

                {
                    cropImg && <View>
                        <Image style={{ position: 'fixed', bottom: '10px', left: '10px', width: '100px' }} src={cropImg} mode='widthFix'></Image>
                    </View>
                }
            </View>
        );
    }
}
