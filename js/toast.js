window.addEventListener('load', () => {
    this.Toast = {
        show(content, key, { variant = 'info',
            position = 'bottom-right',
            rootElement = document.body,
            autoHideDuration = 3000,
            closeOnClick = true } = {}) {

            // check errors
            checkArguments(content, key);
            checkUniqueKey(key);

            // toast icon
            const toastIcon = setToastIcon(variant);

            // creating toast
            toast = document.createElement('div');
            toast.id = key;
            toast.className = 'toast';
            toast.innerHTML = setAppearance(content, variant, toastIcon, closeOnClick);

            // adding toast to root node
            rootElement.prepend(toast);

            // add close func to the close btn if we have this option
            if (closeOnClick) {
                addCloseFunc(key);
            }

            // del toast after autoHideDuration
            this.timeoutId = setTimeout(() => {
                this.close(key);
            }, autoHideDuration);

        },
        close(key) {
            const toast = document.getElementById(key);

            // if we do not delete toast with the help of close btn
            if (toast) {
                toast.remove();
            }

            // clear timeout after closing
            clearTimeout(this.timeoutId);
        }
    }

    const setToastIcon = (variant) => {
        let toastIcon;

        // check variant and set icon
        switch (variant) {
            case 'info':
                toastIcon = '<i class="fas fa-info-circle"></i>';
                break;
            case 'warning':
                toastIcon = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            case 'error':
                toastIcon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'success':
                toastIcon = '<i class="fas fa-check-circle"></i>';
                break;
        }

        return toastIcon;
    }

    const setAppearance = (content,
        variant,
        toastIcon, closeOnClick) => {
        let toast;
        let closeBtn;

        // if have close on click option add close btn
        if (closeOnClick) {
            closeBtn = '<button type="button" class="toast__close-btn">✖</button>'
        } else {
            closeBtn = '';
        }

        // html markup
        toast = `
        <div class="toast__header_${variant}">
        <div class="toast__title-wrapper">
            ${toastIcon}
            <span class="toast__title">${variant.toUpperCase()}</span>
        </div>
        ${closeBtn}
        </div>
        <div class="toast__body">
            <p class="toast__text">${content}</p>
        </div>`

        return toast;
    }

    const addCloseFunc = (key) => {
        const toast = document.getElementById(key);
        // add event listener on toast and use of event delegation, for possible further expansion of functionality
        toast.addEventListener('click', (e) => {
            if (e.target.className = 'toast__close-btn') {
                toast.remove();
            }
        });
    }

    const checkArguments = (content, key) => {
        if (typeof content !== 'string' && !(content instanceof String)) {
            throw new Error('Error! Set a valid argument "content".');
        } else if (typeof key !== 'string') {
            throw new Error('Error! Set a valid argument "key".');
        } else if (content.length === 0) {
            throw new Error('Error! "Content" must not be empty.');
        } else if (key.length === 0) {
            throw new Error('Error! "Key" must not be empty.');
        }
    }

    const checkUniqueKey = (key) => {
        const elem = document.getElementById(key);
        // if we have elem on html with the same id
        if (elem) {
            throw new Error('Error! Set unique id for toast.')
        }
    }
});
