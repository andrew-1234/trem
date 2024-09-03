import React, { useCallback, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button, ButtonGroup } from 'react-bootstrap';
import { BiSave, BiSolidTrashAlt } from 'react-icons/bi';
import styled from 'styled-components';
import rehypeSanitize from 'rehype-sanitize';

const StyledMDEditor = styled(MDEditor)`
  --color-canvas-default: white;
  --color-fg-default: black;
  --color-border-default: #5938df;  
  margin-bottom: 20px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #5938df;
  box-shadow: 0 0 0;
  
  .w-md-editor-toolbar {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #5938df;
    background-color: transparent;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  gap: 10px;
`;

interface NoteEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  onDelete: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ initialContent, onSave, onDelete }) => {
  const [content, setContent] = useState(initialContent);
  const [preview, setPreview] = useState<'edit' | 'live' | 'preview'>('edit');

  const handleSave = useCallback(async () => {
    try {
      await onSave(content);
      console.log('Note saved successfully');
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  }, [content, onSave]);

  return (
    <div>
      <ButtonContainer>
        <ButtonGroup size="sm">
          <Button variant="success" onClick={handleSave}>
            <BiSave /> Save
          </Button>
          <Button variant="danger" onClick={onDelete}>
            <BiSolidTrashAlt /> Delete
          </Button>
        </ButtonGroup>
        <ButtonGroup size="sm">
          {(['edit', 'live', 'preview'] as const).map((mode) => (
            <Button
              key={mode}
              variant={preview === mode ? 'primary' : 'outline-secondary'}
              onClick={() => setPreview(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </ButtonContainer>
      <StyledMDEditor
        data-color-mode="light"
        value={content}
        onChange={(value) => setContent(value || '')}
        preview={preview}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        height={400}
      />
    </div>
  );
};

export default NoteEditor;