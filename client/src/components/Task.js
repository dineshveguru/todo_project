import "../styles/task.css";

function Task(props) {
  const tasks = props.props.map((item) => {
    let completed = "";
    if (item.isFinished) {
      completed = "True";
    } else {
      completed = "False";
    }
    return (
      <div key={item._id} className="task--item">
        <h3>
          <span>Task name:</span> <i>{item.name}</i>
        </h3>
        <p>
          <strong>
            <span>Description: </span>
          </strong>
          {item.description}
        </p>
        <p style={{ color: item.isFinished ? "#0dff00" : "#ff3300" }}>
          <strong>
            <span>Is task is Completed: </span>
          </strong>
          {completed}
        </p>
        <div className="button--container">
          <button
            ref={props.buttonRef}
            onClick={props.deleteHandler}
            data-index={item._id}
            className="delete--button"
          >
            Delete
          </button>
          <button
            id="edit--button"
            onClick={props.editHandler}
            data-index={item._id}
          >
            edit
          </button>
        </div>
      </div>
    );
  });
  return (
    <section className="task--section">
      <h1>These are the tasks</h1>
      <div className="task--container">{tasks}</div>
    </section>
  );
}

export default Task;
