export default (text = 'Hello world') => {
  const element = document.createElement('div');
  const counter = Math.random();

  element.className = 'pure-button';
  element.innerHTML = text;

  element.onclick = () =>
    import('./lazy')
      .then(lazy => {
        element.textContent = counter >= 0.5 ? HELLO : lazy.default;
      })
      .catch(err => {
        console.error(err);
      });

  return element;
};
