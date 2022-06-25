import React from "react";
import dracula from "prism-react-renderer/themes/okaidia";
import Highlight, { defaultProps } from "prism-react-renderer";

export interface BlogCodeProps {
  className?: string;
  pre?: React.ReactElement<any>;
  fallback?: React.ReactElement<any>;
  match?: RegExp;
  children?: React.ReactNode | string;
}

export function BlogCode(props: BlogCodeProps) {
  const { children } = props;

  const language = props.className?.split("language-")[1];

  const code = React.Children.toArray(children).join("\n").replace(/\s$/, "");

  return (
    <Highlight
      {...defaultProps}
      theme={dracula}
      code={code}
      language={language as any}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            textAlign: "left",
            margin: "1em 0",
            padding: "0.5em",
            overflow: "auto",
          }}
        >
          {tokens.map((line, i) => (
            <div
              style={{
                display: "table-row",
              }}
              key={i}
              {...getLineProps({ line, key: i })}
            >
              <div style={{ display: "table-cell" }}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
