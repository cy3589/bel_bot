# BEL_BOT
## With Telegram BOT
- Node.js 의 Bluetooth 제어 Library인 noble과 node상위버전에서 동작하게 패치된 bluetooth-hci-socket 라이브러리 사용
- scan을 시작하고 MAC Adress와 advertisement.localName 이 미리 설정한 값과 일치하면 connect를 시도
- connect 이벤트에 이벤가리스너를 등록하고 이벤트가 발생하면 Telegram Bot에 메세지를 전송하는 통신 함수를 호출
- disconnect도 위와 마찬가지로 동작하며, 재연결 시 동작의 보장을 위해 기존의 이벤트 리스너를 모두 삭제하고 scan을 재시작 하는 코드를 포함한다.
