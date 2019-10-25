import React, { Fragment, Component } from "react";
import "./App.css";
import sampleText from "./sampleText";
import marked from "marked";

class App extends Component {
  state = {
    text: sampleText
  };

  componentDidMount() {
    const text = localStorage.getItem("text");
    if (text) {
      this.setState({ text });
    } else {
      this.setState({ text: sampleText });
    }
  }

  componentDidUpdate() {
    const { text } = this.state;
    localStorage.setItem("text", text);
  }

  handleChange = event => {
    const text = event.target.value;
    this.setState({ text });
  };

  renderMarkdown = text => {
    const __html = marked(text, { sanitize: true });
    return { __html };
  };
  render() {
    return (
      <Fragment>
        <div className="container">
          <h1>Éditeur Markdown</h1>
          <hr />
          <div className="row">
            <div className="col-sm-6">
              <textarea
                rows="35"
                className="form-control"
                value={this.state.text}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="col-sm-6">
              <div
                dangerouslySetInnerHTML={this.renderMarkdown(this.state.text)}
              ></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
