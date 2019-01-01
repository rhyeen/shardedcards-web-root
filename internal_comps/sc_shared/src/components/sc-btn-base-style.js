import { html } from '@polymer/lit-element';
import { SHADOW_ELEVATIONS } from '../entities/sc-shared-styles.js';

export const BTN_COLORS = {
  PRIMARY: {
    TEXT_COLOR: '--sc_btn-dark-btn-text-color',
    BACKGROUND_COLOR: '--sc_btn-primary-background-color'
  },
  SECONDARY: {
    TEXT_COLOR: '--sc_btn-dark-btn-text-color',
    BACKGROUND_COLOR: '--sc_btn-secondary-background-color'
  },
  BACK: {
    TEXT_COLOR: '--sc_btn-dark-btn-text-color',
    BACKGROUND_COLOR: '--sc_btn-back-background-color'
  },
  WARNING: {
    TEXT_COLOR: '--sc_btn-dark-btn-text-color',
    BACKGROUND_COLOR: '--sc_btn-warning-background-color'
  },
  DISABLED: {
    TEXT_COLOR: '--sc_btn-disabled-text-color',
    BACKGROUND_COLOR: '--sc_btn-disabled-background-color'
  },
  DARK_BTN_TEXT_COLOR: '--sc_btn-dark-btn-text-color',
  LIGHT_BTN_TEXT_COLOR: '--sc_btn-light-btn-text-color'
};

export const ScBtnBaseStyle = html`
<style>
  :host {
    --sc_btn-dark-btn-text-color: #FFF;
    --sc_btn-light-btn-text-color: #212121;
    --sc_btn-warning-background-color: #f44336;
    --sc_btn-back-background-color: #424242;
    --sc_btn-primary-background-color: #2196F3;
    --sc_btn-secondary-background-color: #B0BEC5;
    --sc_btn-disabled-text-color: #9E9E9E;
    --sc_btn-disabled-background-color: #BDBDBD;
  }

  button {
    border: none;
    line-height: 40px;
    font-size: 18px;
    text-transform: uppercase;
    border-radius: 4px;
    padding: 0 16px;
    font-weight: 500;
    box-shadow: var(${SHADOW_ELEVATIONS.LEVEL_1.BASE});
  }

  button:hover {
    box-shadow: var(${SHADOW_ELEVATIONS.LEVEL_1.HOVER});
  }

  button:active {
    box-shadow: var(${SHADOW_ELEVATIONS.LEVEL_1.INSET});
  }

  button.btn-warning {
    background-color: var(${BTN_COLORS.WARNING.BACKGROUND_COLOR});
    color: var(${BTN_COLORS.WARNING.TEXT_COLOR});
  }

  button.btn-warning .button-svg-icon {
    fill: var(${BTN_COLORS.WARNING.TEXT_COLOR});
  }

  button.btn-back {
    background-color: var(${BTN_COLORS.BACK.BACKGROUND_COLOR});
    color: var(${BTN_COLORS.BACK.TEXT_COLOR});
  }

  button.btn-back .button-svg-icon {
    fill: var(${BTN_COLORS.BACK.TEXT_COLOR});
  }

  button.btn-primary {
    background-color: var(${BTN_COLORS.PRIMARY.BACKGROUND_COLOR});
    color: var(${BTN_COLORS.PRIMARY.TEXT_COLOR});
  }

  button.btn-primary .button-svg-icon {
    fill: var(${BTN_COLORS.PRIMARY.TEXT_COLOR});
  }

  button.btn-secondary {
    background-color: var(${BTN_COLORS.SECONDARY.BACKGROUND_COLOR});
    color: var(${BTN_COLORS.SECONDARY.TEXT_COLOR});
  }

  button.btn-secondary .button-svg-icon {
    fill: var(${BTN_COLORS.SECONDARY.TEXT_COLOR});
  }

  button[disabled] {
    background-color: var(${BTN_COLORS.DISABLED.BACKGROUND_COLOR});
    color: var(${BTN_COLORS.DISABLED.TEXT_COLOR});
    box-shadow: none;
  }

  button[disabled]:hover {
    box-shadow: none;
  }

  button[disabled]:active {
    box-shadow: none;
  }

  button[disabled] .button-svg-icon {
    fill: var(${BTN_COLORS.DISABLED.TEXT_COLOR});
  }
</style>
`;
