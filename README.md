# image-resize

개인적으로 마음에 드는 이미지 리사이즈 도구를 못찾아서 이렇게 만들게 되었다.  
이 도구는 웹 브라우저에서 사용하는 `<Canvas/>`엘리먼트를 사용하여 이미지 리사이즈 한다.


## Demo

데모를 통하여 이미지 url, 이미지 첨부파일을 리사이즈하는 모습을 볼 수 확인할 수 있다.

https://redgoose-dev.github.io/image-resize/


## Installation

`CLI`에서 설치할 프로젝트에서 다음과 같은 명령을 실행한다.

### npm
```
npm install image-resize
```

### yarn
```
yarn add image-resize
```


## Usage

먼저 `ImageResize` 객체를 만들어서 `play()`메서드를 실행하는 방식이다.

### Module environment

```javascript
import ImageResize from 'image-resize';

var imageResize = new ImageResize({
  format: 'png',
  width: 640
});
imageResize.play('image.jpg');
```

### Vanilla environment

```html
<script src="./ImageResize.umd.js"></script>

<script>
var imageResize = new ImageResize({
  format: 'png',
  width: 640
});
imageResize.play('image.jpg');
</script>
```


## Options

`image-resize`에서 다음과 같은 옵션을 사용하여 컨트롤할 수 있다.

### Basic

| Name |  Type  | Default | Description |
|:----:|:------:|:-------:|:------------|
| quality | number | `.75` | jpg 이미지일때의 이미지 퀄리티값 |
| format | string | `jpg` | 출력할 포맷. `png,jpg` |
| outputType | string | `base64 ` | 출력방식. `base64,canvas,blob` |
| width | number | `320` | 조절할 가로사이즈 |
| height | number | `null` | 조절할 세로 사이즈. 한쪽값이 있는쪽으로 기준이 되어 조절한다. |
| reSample | number | `2` | 리새플링 횟수. 수치가 높을수록 경계선이 부드러워지지만 처리속도는 느려진다. 최대 4까지 적용된다. |
| bgColor | string | `#ffffff` | 캔버스 배경색 |


## Methods

만들어진 인스턴스 객체에서 액션을 실행하는 메서드가 제공된다. 메서드를 사용하기 위하여 다음과 같이 인스턴스 객체를 만들었다.

```javascript
var imageResize = new ImageResize();
```

좀더 자세하게 사용하는 방법에 대해서는 데모 소스를 참고.  
https://github.com/redgoose-dev/image-resize/blob/main/src/demo/index.js


### play

실질적으로 리사이즈를 실행한다.

- Param `String,HTMLInputElement,File,Blob`
- Return `string,object,HTMLCanvasElement`

```javascript
// image url
try {
  let res = await imageResize.play('image.jpg')
  console.log(res);
} catch (e) {
  console.error(e);
}

// <input type="file" id="upload"/>
let res = await imageResize.play(document.getElementById('upload'));

// File
let res = await imageResize.play(element.files[0]);

// Blob
let res = await imageResize.play(new Blob(src, { type: 'image/jpeg' }));
```

### updateOptions

정의되어있는 객체의 옵션을 변경한다.

- Param `Object`
- Return `ImageResize`

```javascript
imageResize.updateOptions({
  width: 800,
  format: 'jpg',
  quality: .5
});
```

다음과 같이 다른 메서드와 같이 묶어서 사용할 수 있다.

```javascript
imageResize
  .updateOptions({ width: 400 })
  .play('image.jpg')
  .then();

let res = await imageResize
  .updateOptions({ width: 400 })
  .play('image.jpg');
```

### get

이미지나 파일첨부폼을 이용해서 캔버스로 가져온다.

- Param `string,HTMLInputElement,File,Blob`
- Return `HTMLCanvasElement`

```javascript
// image url
imageResize.get('image.jpg').then();

// <input type="file" id="upload"/>
let res = await imageResize.get(document.getElementById('upload'));
```

### resize

리사이즈 실행하는 역할을 한다.

- Param `HTMLCanvasElement`
- Return `HTMLCanvasElement`

```javascript
imageResize.resize(document.getElementById('canvas')).then();
```

### output

결과물을 출력하는 역할을 한다.

- Param `HTMLCanvasElement`
- Return `string,object,HTMLCanvasElement`

```javascript
imageResize.output(document.getElementById('canvas')).then();
```


## Mix methods

메서드들이 `Promise`로 리턴되기 때문에 다음과 같이 연결해서 사용할 수 있다.  
체인 형식이다보니 중간에 다른 함수를 끼워넣어서 사용할 수 있다.

```javascript
try {
  const imageResize = new ImageResize();
  let res = await imageResize.updateOptions({ width: 640 }).get('image.jpg');
  res = await imageResize.resize(canvas);
  res = await ready(res);
  res = await imageResize.output(canvas);
  console.log(res);
} catch (e) {
  console.error(error);
}
```


## Development

이 도구를 직접 수정할 수 있다.  
`/src`에 있는 소스를 수정하고 다음과 같이 cli 명령을 통하여 빌드할 수 있다.

```
// development
yarn run dev

// production
yarn run build

// preview
yarn run start
```


## Support browser

- Google chrome
- Safari (문제가 생길 수 있습니다.)
