import React from "../../myreact/react";
// import PropTypes from "prop-types";
import Clipboard from "clipboard";

import EmojiResultRow from "./EmojiResultRow";
import "./EmojiResults.css";

export default class EmojiResults extends React.Component {
  // static propTypes = {
  //   emojiData: PropTypes.array
  // };

  componentDidMount() {
    this.clipboard = new Clipboard(".copy-to-clipboard");
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    // this.props.emojiData.map will return undefined component
    return (
      <div className="component-emoji-results">
        {/* <EmojiResultRow
            key={this.props.emojiData[0].title}
            symbol={this.props.emojiData[0].symbol}
            title={this.props.emojiData[0].title}
          />
          <EmojiResultRow
            key={this.props.emojiData[1].title}
            symbol={this.props.emojiData[1].symbol}
            title={this.props.emojiData[1].title}
          />
          <EmojiResultRow
            key={this.props.emojiData[2].title}
            symbol={this.props.emojiData[2].symbol}
            title={this.props.emojiData[2].title}
          />*/}
        <div className="component-emoji-results">
          {this.props.emojiData.map((item) => {
            return <EmojiResultRow
              key={item.title}
              symbol={item.symbol}
              title={item.title}
            />
          })}
        </div>
      </div>
    );
  }
}
