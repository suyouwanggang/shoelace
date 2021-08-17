import { css } from 'lit';
export default css`
  @keyframes sl-show {
    from {
      height: 0;
    }
    50% {
      height: cal(var(--sl-show-height) / 2);
    }
    to {
      height: var(--sl-show-height);
    }
  }
  @keyframes sl-hide {
    from {
      height: var(--sl-show-height);
    }
    50% {
      height: cal(var(--sl-show-height) / 2);
    }
    to {
      height: 0;
    }
  }
`;