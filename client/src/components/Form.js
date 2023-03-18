import "../styles/form.css";

function Form(props) {
  return (
    <section className="form--section">
      <div>
        <div className="form--container">
          <div>
            <p>Name: </p>
          </div>
          <div>
            <input
              type="text"
              name="name"
              onChange={props.props.addHandler}
              value={props.props.todo.name}
            />
          </div>
          <div>
            <p>Description: </p>
          </div>
          <div>
            <input
              type="text"
              name="description"
              onChange={props.props.addHandler}
              value={props.props.todo.description}
            />
          </div>
          <div>
            <p>Is Finished: </p>
          </div>
          <div>
            <input
              type="checkbox"
              name="isFinished"
              onChange={props.props.checkBoxHandler}
              checked={props.props.todo.isFinished}
            />
          </div>
        </div>
        <button onClick={props.props.submitHandler} id="submit--button">
          Submit
        </button>
      </div>
    </section>
  );
}

export default Form;
