window.addEventListener('load', () => {
    this.Toast = {
        show(content, key, { variant = 'info',
            position = 'bottom-right',
            autoHideDuration = 5000,
            closeOnClick = true } = {}) {
            // checking errors
            checkArguments(content, key);
            checkUniqueKey(key);

            // toast icon
            const toastIcon = setToastIcon(variant);

            // generate markup
            const markup = generateMarkup(content, variant, toastIcon, closeOnClick);

            // create toasts container
            addToastsContainer(position);

            // creating toast
            addToastToPage(key, markup, position)

            // add close func to the close btn if we have this option
            if (closeOnClick) {
                addCloseFunc(key);
            }

            // del toast after autoHideDuration
            let timeoutId = setTimeout(() => {
                this.close(key, timeoutId);

                // clear after closing
                clearTimeout(timeoutId);
            }, autoHideDuration);

        },
        close(key, timeoutId) {
            const toast = document.getElementById(key);

            // if we do not delete toast with the help of close btn
            if (toast) {
                toast.remove();
            }

            // clear after closing
            clearTimeout(timeoutId);
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

    const generateMarkup = (content,
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

    const addToastsContainer = (position) => {
        const container = document.querySelector('.toasts-container_' + position);

        // if we do not have container with the same class
        if (!container) {
            const toastsContainer = document.createElement('div');
            toastsContainer.className = 'toasts-container_' + position;
            document.body.append(toastsContainer);
        }
    }

    const addToastToPage = (key, markup, position) => {
        // container for adding post
        const container = document.querySelector('.toasts-container_' + position);

        // creating toast
        toast = document.createElement('div');
        toast.id = key;
        toast.className = 'toast';
        toast.innerHTML = markup;

        // adding toast to root node
        if (position === 'bottom-right' || position === 'bottom-left') {
            container.append(toast);
        }
        else {
            container.prepend(toast);
        }

        // animation after adding new toast
        toast.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 1000
        })
    }
});
