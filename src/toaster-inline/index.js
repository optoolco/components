class TonicToasterInline extends Tonic { /* global Tonic */
  getPropertyValue (s) {
    const computed = window.getComputedStyle(this.root)
    return computed.getPropertyValue(`--${s}`).trim()
  }

  defaults () {
    return {
      display: 'true',
      closeIcon: TonicToasterInline.svg.closeIcon(),
      dangerIcon: TonicToasterInline.svg.dangerIcon(this.getPropertyValue('danger')),
      warningIcon: TonicToasterInline.svg.warningIcon(this.getPropertyValue('warning')),
      successIcon: TonicToasterInline.svg.successIcon(this.getPropertyValue('success')),
      infoIcon: TonicToasterInline.svg.infoIcon(this.getPropertyValue('info'))
    }
  }

  stylesheet () {
    return `
      tonic-toaster-inline .tonic--notification {
        max-height: 0;
        position: relative;
        background-color: var(--tonic-window);
        border-radius: 3px;
        -webkit-transform: scale(0.95);
        -ms-transform: scale(0.95);
        transform: scale(0.95);
        transition: opacity 0.2s ease-in-out 0s, transform 0.3s ease-in-out 0s, max-height 0.3s ease-in-out;
        border: 1px solid var(--tonic-border);
        opacity: 0;
        z-index: 1;
      }

      tonic-toaster-inline .tonic--notification.tonic--show {
        max-height: 100%;
        margin: 10px 0;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        transition: opacity 0.2s ease-in-out, transform 0.3s ease-in-out, max-height 0.3s ease-in-out;
        opacity: 1;
      }

      tonic-toaster-inline .tonic--warning {
        border-color: var(--tonic-warning);
      }

      tonic-toaster-inline .tonic--danger {
        border-color: var(--tonic-danger);
      }

      tonic-toaster-inline .tonic--success {
        border-color: var(--tonic-success);
      }

      tonic-toaster-inline .tonic--info {
        border-color: var(--tonic-secondary);
      }

      tonic-toaster-inline .tonic--notification.tonic--close {
        padding-right: 50px;
      }

      tonic-toaster-inline .tonic--notification.tonic--alert {
        padding-left: 35px;
      }

      tonic-toaster-inline main {
        padding: 17px 15px 15px 15px;
      }

      tonic-toaster-inline .tonic--title {
        color: var(--tonic-primary);
        font: 14px/18px var(--tonic-subheader);
      }

      tonic-toaster-inline .tonic--message {
        font: 14px/18px var(--tonic-subheader);
        color: var(--tonic-medium);
      }

      tonic-toaster-inline .tonic--notification .tonic--icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 20px;
        top: 50%;
        background-size: cover;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      tonic-toaster-inline .tonic--notification .tonic--close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        cursor: pointer;
        background-size: cover;
      }

      tonic-toaster-inline .tonic--notification .tonic--close svg path {
        fill: var(--tonic-primary);
        color: var(--tonic-primary);
      }
    `
  }

  show () {
    if (!this.root) return
    const node = this.root.querySelector('.tonic--notification')
    node.classList.add('tonic--show')
  }

  hide () {
    if (!this.root) return
    const node = this.root.querySelector('.tonic--notification')
    node.classList.remove('tonic--show')
  }

  click (e) {
    const el = Tonic.match(e.target, '.tonic--close')
    if (!el) return

    this.hide()
  }

  connected () {
    if (!this.root) return

    const {
      display,
      duration
    } = this.props

    if (display === 'true') {
      window.requestAnimationFrame(() => this.show())
    }

    if (duration) {
      setTimeout(() => this.hide(), duration)
    }
  }

  styles () {
    const icon = this.props[this.props.type + 'Icon']

    return {
      icon: {
        backgroundImage: `url("${icon}")`
      },
      close: {
        backgroundImage: `url("${this.props.closeIcon}")`
      }
    }
  }

  renderClose () {
    if (this.props.dismiss !== 'true') {
      return ''
    }

    return this.html`<div class="tonic--close" styles="close"></div>`
  }

  renderIcon () {
    if (!this.props.type) return ''
    return this.html`<div class="tonic--icon" styles="icon"></div>`
  }

  render () {
    const {
      title,
      type,
      message,
      theme
    } = this.props

    if (theme) {
      this.root.setAttribute('theme', theme)
    }

    let typeClasses = ''

    if (type) {
      typeClasses = `tonic--alert tonic--${type}`
    }

    return this.html`
      <div class="tonic--notification ${typeClasses}">
        ${this.renderIcon()}
        ${this.renderClose()}
        <main>
          <div class="tonic--title">
            ${title}
          </div>
          <div class="tonic--message">
            ${message || this.childNodes}
          </div>
        </main>
      </div>
    `
  }
}

TonicToasterInline.svg = {}
TonicToasterInline.svg.toURL = s => `data:image/svg+xml;base64,${window.btoa(s)}`

TonicToasterInline.svg.closeIcon = color => TonicToasterInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
  </svg>
`)

TonicToasterInline.svg.dangerIcon = color => TonicToasterInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M53.9,76.4h-7.6V68h7.6V76.4z M53.9,60.5h-7.6V25.6h7.6V60.5z"/>
  </svg>
`)

TonicToasterInline.svg.warningIcon = color => TonicToasterInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M98.6,86.6l-46-79.7c-1.2-2-4-2-5.2,0l-46,79.7c-1.2,2,0.3,4.5,2.6,4.5h92C98.3,91.1,99.8,88.6,98.6,86.6z M53.9,80.4h-7.6V72h7.6V80.4z M53.9,64.5h-7.6V29.6h7.6V64.5z"/>
  </svg>
`)

TonicToasterInline.svg.successIcon = color => TonicToasterInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M43.4,71.5L22,50.1l4.8-4.8L43.4,62l28.5-28.5l4.8,4.8L43.4,71.5z"/>
  </svg>
`)

TonicToasterInline.svg.infoIcon = color => TonicToasterInline.svg.toURL(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path fill="${color}" d="M50.1,6.7C26.3,6.7,6.9,26.2,6.9,50s19.4,43.2,43.2,43.2c23.8,0,43.2-19.5,43.2-43.3C93.3,26.1,74,6.7,50.1,6.7z M54.1,75.5h-8.1v-7.8h8.1V75.5z M64.1,47.6c-0.8,1.1-2.4,2.7-4.8,4.5L57,54c-1.4,1.1-2.3,2.3-2.7,3.7c-0.3,0.8-0.4,2-0.4,3.6h-8c0.1-3.4,0.5-5.8,1-7.1c0.5-1.3,2-2.9,4.3-4.7l2.4-1.9c0.8-0.6,1.5-1.3,2-2.1c0.9-1.3,1.4-2.8,1.4-4.3c0-1.8-0.5-3.4-1.6-4.9c-1.1-1.5-3-2.3-5.8-2.3c-2.7,0-4.7,0.9-5.9,2.8c-1,1.6-1.6,3.3-1.7,5.1h-8.6c0.4-5.9,2.5-10.1,6.4-12.6l0,0c2.5-1.6,5.7-2.5,9.4-2.5c4.9,0,9,1.2,12.2,3.5c3.2,2.3,4.8,5.7,4.8,10.3C66.2,43.4,65.5,45.7,64.1,47.6z"/>
  </svg>
`)

Tonic.add(TonicToasterInline)
