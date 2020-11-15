window.addEventListener('load', () => {
    const form = document.getElementById('playground-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const content = data.get('content'),
            variant = data.get('variant'),
            position = data.get('position'),
            autoHideDuration = data.get('autoHideDuration'),
            closeOnClick = data.get('closeOnClick');
        Toast.show(content, `${Math.random()}`, { variant, position, autoHideDuration, closeOnClick: JSON.parse(closeOnClick) })
    })
});