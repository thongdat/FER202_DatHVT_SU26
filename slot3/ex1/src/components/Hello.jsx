function Hello() {

  const helloStyle = {
    fontSize: '36px',
    color: 'black',
    fontWeight: 'normal'
  };

  const reactStyle = {
    fontSize: 48,
    color: 'blue',
    fontWeight: 'bold'
  };

  return (
    <div>
      <p style={helloStyle}>
        Hello <span style={reactStyle}>React</span>
      </p>
    </div>
  );
}

export default Hello;