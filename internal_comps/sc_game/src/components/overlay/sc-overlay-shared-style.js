import { html } from '@polymer/lit-element';

export const ScOverlaySharedStyle = html`
<style>
  :host {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  [btn-group] {
    margin: 20px 0 40px 0;
  }

  [btn-group] sc-btn:first-child {
    margin-left: 0;
  }

  [btn-group] sc-btn {
    margin-left: 20px;
  }

  sc-btn:first-child {
    margin-top: 0;
  }

  sc-btn {
    margin-top: 20px;
  }
</style>
`;
