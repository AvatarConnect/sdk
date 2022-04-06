export const TRANSITION_SHORT = 300
export const TRANSITION_LONG = 450

const styles = `
.avatarconnect__modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 12px;
}

.avatarconnect__modal__overlay {
  cursor: pointer;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgb(17, 24, 39);
  opacity: 0;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: ${TRANSITION_SHORT}ms;
}

.avatarconnect__modal__content {
  position: relative;
  background: #f3f4f6;
  width: calc(100% - 24px);
  height: calc(100% - 24px);
  max-width: 800px;
  max-height: 500px;
  z-index: 10000;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 4px 16px 5px rgba(17, 24, 39, 0.2),
    0 6px 25px 5px rgba(17, 24, 39, 0.19);
  opacity: 0;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: ${TRANSITION_LONG}ms;
}

.avatarconnect__iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10002;
}

.avatarconnect__spinner {
  font-size: 50px;
  position: absolute;
  left: calc(50% - 25px);
  top: calc(50% - 25px);
  display: inline-block;
  width: 1em;
  height: 1em;
  z-index: 10001;
}

.avatarconnect__spinner div {
  position: absolute;
  left: 0.4629em;
  bottom: 0;
  width: 0.074em;
  height: 0.2777em;
  border-radius: 0.5em;
  background-color: transparent;
  -webkit-transform-origin: center -0.2222em;
  -ms-transform-origin: center -0.2222em;
  transform-origin: center -0.2222em;
  -webkit-animation: avatarconnect__spinner-fade 1s infinite linear;
  animation: avatarconnect__spinner-fade 1s infinite linear;
}
.avatarconnect__spinner div:nth-child(1) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  transform: rotate(0deg);
}
.avatarconnect__spinner div:nth-child(2) {
  -webkit-animation-delay: 0.083s;
  animation-delay: 0.083s;
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
}
.avatarconnect__spinner div:nth-child(3) {
  -webkit-animation-delay: 0.166s;
  animation-delay: 0.166s;
  -webkit-transform: rotate(60deg);
  -ms-transform: rotate(60deg);
  transform: rotate(60deg);
}
.avatarconnect__spinner div:nth-child(4) {
  -webkit-animation-delay: 0.249s;
  animation-delay: 0.249s;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.avatarconnect__spinner div:nth-child(5) {
  -webkit-animation-delay: 0.332s;
  animation-delay: 0.332s;
  -webkit-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  transform: rotate(120deg);
}
.avatarconnect__spinner div:nth-child(6) {
  -webkit-animation-delay: 0.415s;
  animation-delay: 0.415s;
  -webkit-transform: rotate(150deg);
  -ms-transform: rotate(150deg);
  transform: rotate(150deg);
}
.avatarconnect__spinner div:nth-child(7) {
  -webkit-animation-delay: 0.498s;
  animation-delay: 0.498s;
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.avatarconnect__spinner div:nth-child(8) {
  -webkit-animation-delay: 0.581s;
  animation-delay: 0.581s;
  -webkit-transform: rotate(210deg);
  -ms-transform: rotate(210deg);
  transform: rotate(210deg);
}
.avatarconnect__spinner div:nth-child(9) {
  -webkit-animation-delay: 0.664s;
  animation-delay: 0.664s;
  -webkit-transform: rotate(240deg);
  -ms-transform: rotate(240deg);
  transform: rotate(240deg);
}
.avatarconnect__spinner div:nth-child(10) {
  -webkit-animation-delay: 0.747s;
  animation-delay: 0.747s;
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}
.avatarconnect__spinner div:nth-child(11) {
  -webkit-animation-delay: 0.83s;
  animation-delay: 0.83s;
  -webkit-transform: rotate(300deg);
  -ms-transform: rotate(300deg);
  transform: rotate(300deg);
}
.avatarconnect__spinner div:nth-child(12) {
  -webkit-animation-delay: 0.913s;
  animation-delay: 0.913s;
  -webkit-transform: rotate(330deg);
  -ms-transform: rotate(330deg);
  transform: rotate(330deg);
}

@-webkit-keyframes avatarconnect__spinner-fade {
  0% {
    background-color: rgb(17, 24, 39);
  }
  100% {
    background-color: transparent;
  }
}

@keyframes avatarconnect__spinner-fade {
  0% {
    background-color: rgb(17, 24, 39);
  }
  100% {
    background-color: transparent;
  }
}
`

export default styles
