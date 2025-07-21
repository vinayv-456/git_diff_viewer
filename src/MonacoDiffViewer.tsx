import { useEffect, useRef, useState, useCallback } from "react";

interface DiffViewerProps {
  originalText?: string;
  modifiedText?: string;
}

const MonacoDiffViewer = ({
  originalText = "Old text here...",
  modifiedText = "New text here...",
}: DiffViewerProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const [viewMode, setViewMode] = useState<"split" | "unified">("split");
  const [isMonacoLoaded, setIsMonacoLoaded] = useState(false);

  const loadMonaco = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).monaco) {
      setIsMonacoLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js";
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (win.require && typeof win.require.config === "function") {
        win.require.config({
          paths: {
            vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs",
          },
        });
        win.require(["vs/editor/editor.main"], () => {
          setIsMonacoLoaded(true);
        });
      }
    };
    document.head.appendChild(script);
  };

  const createDiffEditor = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (!win.monaco || !containerRef.current) return;
    if (editorRef.current) {
      editorRef.current.dispose();
    }
    editorRef.current = win.monaco.editor.createDiffEditor(
      containerRef.current,
      {
        theme: "vs-dark",
        originalEditable: true,
        readOnly: false,
        renderSideBySide: viewMode === "split",
        fontSize: 14,
        fontFamily: "Consolas, Monaco, monospace",
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        wordWrap: "on",
        enableSplitViewResizing: true,
        automaticLayout: true,
      }
    );
    const originalModel = win.monaco.editor.createModel(
      originalText,
      "text/plain"
    );
    const modifiedModel = win.monaco.editor.createModel(
      modifiedText,
      "text/plain"
    );
    editorRef.current.setModel({
      original: originalModel,
      modified: modifiedModel,
    });
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    }, 100);
  }, [viewMode, originalText, modifiedText]);

  const acceptAllChanges = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!editorRef.current) return;
    const modifiedModel = editorRef.current.getModel()?.modified;
    const originalModel = editorRef.current.getModel()?.original;
    if (modifiedModel && originalModel) {
      originalModel.setValue(modifiedModel.getValue());
    }
  };

  const revertAllChanges = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!editorRef.current) return;
    const modifiedModel = editorRef.current.getModel()?.modified;
    const originalModel = editorRef.current.getModel()?.original;
    if (modifiedModel && originalModel) {
      modifiedModel.setValue(originalModel.getValue());
    }
  };

  useEffect(() => {
    loadMonaco();
  }, []);

  useEffect(() => {
    if (isMonacoLoaded) {
      createDiffEditor();
    }
  }, [isMonacoLoaded, createDiffEditor]);

  return (
    <div
      style={{
        background: "#1e1e1e",
        color: "#fff",
        padding: 8,
        width: "100vw",
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button onClick={revertAllChanges}>Revert All</button>
        <button onClick={acceptAllChanges}>Accept All</button>
        <button
          onClick={() => setViewMode("split")}
          style={{ fontWeight: viewMode === "split" ? "bold" : undefined }}
        >
          Split View
        </button>
        <button
          onClick={() => setViewMode("unified")}
          style={{ fontWeight: viewMode === "unified" ? "bold" : undefined }}
        >
          Unified View
        </button>
      </div>
      <div
        ref={containerRef}
        style={{ width: "100%", height: 500, border: "1px solid #333" }}
      />
      {!isMonacoLoaded && <div>Loading Monaco Editor...</div>}
    </div>
  );
};

export default MonacoDiffViewer;
