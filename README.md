# image-resize

개인적으로 마음에 드는 이미지 리사이즈 도구를 못찾아서 이렇게 만들게 되었다.  
이 도구는 웹 브라우저에서 사용하는 `Canvas`엘리먼트를 사용하여 이미지 리사이즈 한다.


## Demo

데모를 통하여 이미지 url, 이미지 첨부파일을 리사이즈하는 모습을 볼 수 확인할 수 있다.

https://redgoosedev.github.io/image-resize/


## Installation

CLI에서 설치할 프로젝트에서 다음과 같은 명령을 실행한다.

### npm
```
npm install image-resize
```

### yarn
```
yarn add image-resize
```


## Usage

먼저 	`ImageResize` 객체를 만들어서 `play()`메서드를 실행하는 방식이다.

### Module environment
```
import ResizeImage from 'image-resize';

var resizeImage = new ResizeImage({
	format: 'png',
	width: 640
});
resizeImage.play('image.jpg');
```

### Vanilla environment
```
<script src="ResizeImage.js"></script>

<script>
var resizeImage = new ResizeImage({
	format: 'png',
	width: 640
});
resizeImage.play('image.jpg');
</script>
```


## Options

`image-resize`에서 다음과 같은 옵션을 사용하여 컨트롤할 수 있다.

### Basic
| Name | Type | Default | Description |
|:----:|:----:|:-------:|:------------|
| quality | Number | `.75` | jpg 이미지일때의 이미지 퀄리티값 |
| format | String | `jpg` | 출력할 포맷. `png,jpg` |
| outputType | String | `base64 ` | 출력방식. `base64|canvas|blob` |
| width | Number | `320` | 조절할 가로사이즈 |
| height | Number | `null` | 조절할 세로 사이즈. 한쪽값이 있는쪽으로 기준이 되어 조절한다. |
| reSample | Number | `2` | 리새플링 횟수. 수치가 높을수록 경계선이 부드러워지지만 처리속도는 느려진다. 최대 4까지 적용된다. |
| bgColor | String | `#ffffff` | 캔버스 배경색 |

### Callbacks
| Name | Type | Description |
|:----:|:----:|:------------|
| callback_ready | Function | `play()`메서드가 실행할때 실행되는 콜백함수 |


## Methods

만들어진 인스턴스 객체에서 액션을 실행하는 메서드가 제공된다. 메서드를 사용하기 위하여 다음과 같이 인스턴스 객체를 만들었다.

```
var resizeImage = new ResizeImage();
```

좀더 자세하게 사용하는 방법에 대해서는 데모 소스를 참고.  
https://github.com/RedgooseDev/image-resize/blob/master/demo/demo.js


### play

실질적으로 리사이즈를 실행한다.

#### image url

이미지 url에서 가져오기

```
resizeImage.play('http://address.com/image.jpg')
	.then(function(responses) {
		console.log(response);
	})
	.catch(function(error) {
		console.error(error);
	});
```

#### upload form

파일첨부로 올린 이미지를 가져오기

##### html
```
<input type="file" id="upload"/>
```
##### javascript
```
resizeImage.play(document.getElementById('upload'))
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.error(error);
	});
```

### updateOptions

객체에 정의되어있는 옵션을 변경한다.

```
resizeImage.updateOptions({
	width: 800,
	format: 'jpg',
	quality: .5
});
```

## Development

이 도구를 직접 수저할 수 있다.  
`/src`에 있는 소스를 수정하고 다음과 같이 cli 명령을 통하여 빌드할 수 있다.

### Installed gulp
```
// build
gulp build

// watch
gulp watch
```

### Not installed gulp
```
// build
./node_modules/.bin/gulp build

// watch
./node_modules/.bin/gulp watch
```


## Support browser

- Google chrome
- Safari
