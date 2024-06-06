# image-resize

개인적으로 마음에 드는 이미지 리사이즈 도구를 못찾아서 이렇게 만들게 되었다.  
이 도구는 웹 브라우저에서 사용하는 `<canvas/>`엘리먼트를 사용하여 이미지 리사이즈 한다.


## Demo

데모를 통하여 이미지 url, 이미지 첨부파일을 리사이즈하는 모습을 볼 수 확인할 수 있다.

> https://kode-team.github.io/image-resize/


## Installation

`CLI`에서 설치할 프로젝트에서 다음과 같은 명령을 실행한다.

```
npm install image-resize
yarn add image-resize
bun add -d image-resize
```


## Usage

`import`로 함수를 불러서 비동기 방식으로 사용하면 된다.

### Module environment

```javascript
import imageResize from 'image-resize'

let res = await imageResize('image.jpg', {
  format: 'png',
  width: 640,
})
```

### Vanilla environment

```html
<script src="imageResize.umd.js"></script>

<script>
let res = await imageResize('image.jpg', {
  format: 'png',
  width: 640,
})
</script>
```


## Source

사용하기 먼저 어떤 형식의 이미지 데이터를 지원하는지 확인해볼 필요가 있다.
지원하는 이미지 데이터의 형식은 다음과 같다.

- `String`: 이미지 url
- `File`: File 형식의 객체
- `Blob`: Blob 타입의 객체
- `HTMLCanvasElement`: canvas 엘리먼트


## Options

다음과 같은 옵션을 사용할 수 있다.

|    Name    |  Type  |    Default    | Description                                             |
|:----------:|:------:|:-------------:|:--------------------------------------------------------|
|   width    | number |     `320`     | 조절할 가로사이즈                                               |
|   height   | number |  `undefined`  | 조절할 세로 사이즈. 한쪽값이 있는쪽으로 기준이 되어 조절한다.                     |
|   format   | string |     `jpg`     | 출력할 포맷. `png,jpg,webp`                                  |
| outputType | string |   `base64`    | 출력방식. `base64,canvas,blob`                              |
|  quality   | number |     `.75`     | jpg 이미지일때의 이미지 퀄리티값                                     |
|  reSample  | number |      `2`      | 리샘플링 횟수. 수치가 높을수록 경계선이 부드러워지지만 처리속도는 느려진다. 최대 4까지 적용된다. |
|  sharpen   | number |    `0.75`     | 선명함의 강도                                                 |
|  bgColor   | string | `transparent` | 캔버스 배경색 (배경이 투명한 이미지를 사용하면 영향을 받을 수 있다.)                |

### 사이즈 값 조정

width, height 사이즈 값은 다음과 같은 조건을 따른다.

- width, height 둘다 있을때: width 값이 기준이 된다.
- width 값이 없을때: height 값이 기준이 된다.
- height 값이 없을때: width 값이 기준이 된다.
- width, height 둘다 없을때: width 값이 기준이 된다.

만약 height 값을 기준으로 사용하고 싶다면 `width`값을 `0`이나 `undefined`으로 넣어줘야한다.

### 배경색

기본값으로 `transparent`로 설정되어있다.
투명한 배경 이미지에 배경색을 넣고싶다면 `#ffffff`같은 값으로 넣어주면 배경색이 들어가게 된다.


## Output

함수를 실행하고 반환해주는 데이터의 형식이다.
옵션에서 `outputType` 값에 맞는 형식으로 데이터가 리턴된다.

- `base64`: base64 형식의 문자
- `blob`: Blob 타입의 객체
- `canvas`: canvas 엘리먼트


## Development

이 도구를 직접 수정할 수 있다.  
`/src`에 있는 소스를 수정하고 다음과 같이 cli 명령을 통하여 빌드할 수 있다.

```
// development
npm run dev

// production
npm run build

// preview
npm run preview
```
