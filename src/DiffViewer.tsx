import React from "react";
import { DiffEditor } from "@monaco-editor/react";

interface DiffViewerProps {
  original: string;
  modified: string;
  originalLabel?: string;
  modifiedLabel?: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({
  original,
  modified,
  originalLabel = "Original",
  modifiedLabel = "Modified",
}) => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span>
          <b>{originalLabel}</b>
        </span>
        <span>
          <b>{modifiedLabel}</b>
        </span>
      </div>
      <DiffEditor
        height="450px"
        language="markdown"
        original={original}
        modified={modified}
        theme="vs"
        options={{
          readOnly: true,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};

export default DiffViewer;
