window.addEventListener('load', () => {
    window.Toast = {
        show(content, key, { variant = 'info',
            position = 'bottom-right',
            rootElement = document.body,
            autoHideDuration = 3000,
            closeOnClick = true } = {}) {
            // toast icon
            let toastIcon = setToastIcon(variant);

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
            setTimeout(() => {
                this.close(key);
            }, autoHideDuration);

        },
        close(key) {
            let toast = document.getElementById(key);

            // if we do not delete toast with the help of close btn
            if (toast) {
                toast.remove();
            }
        }
    }

    const setToastIcon = (variant) => {
        let toastIcon;

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

        if (closeOnClick) {
            closeBtn = '<button type="button" class="toast__close-btn">✖</button>'
        } else {
            closeBtn = '';
        }

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
        toast.addEventListener('click', (e) => {
            if (e.target.className = 'toast__close-btn') {
                toast.remove();
            }
        });
    }
});
