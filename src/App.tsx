import React, { useEffect, useState } from 'react';
import { NoteModal, Note } from './components';
import { Row, Col, Button, Layout, Typography, Divider } from 'antd';
import { Note as NoteType } from './interfaces/Interfaces';
import { Delete, GetAll, Post, Put } from './services/Note/NoteService';

const { Title } = Typography;

const { Header, Footer, Content } = Layout;

type Action = 'edit' | 'create';

function App() {

  const [creatingNote, setCreatingNote] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<NoteType>();
  const [notes, setNotes] = useState<Array<NoteType>>([]);

  useEffect(() => {
    requestData();
  }, []);

  const hideModal = (action: Action) => {
    let change;
    switch (action) {
      case 'edit':
        change = () => setEditingNote(undefined);
        break;
      case 'create':
        change = () => setCreatingNote(false);
        break;
    }
    return change;
  };

  const requestData = () => {
    GetAll().then((res: Array<NoteType>) => {
      setNotes(res);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleAddNote = (note: NoteType) => {
    note.id = `${Date.now()}`;
    Post(note).then(() => {
      requestData();
    });
  }

  const handleDeleteNote = (id: string) => {
    Delete(id).finally(() => {
      requestData();
    });
  }

  const handleEditNote = (id: string) => {
    setEditingNote(notes.find(note => note.id === id));
  }

  const handleUpdateNote = (note: NoteType) => {
    note.id = editingNote?.id ?? "0";
    Put(note).then(() => {
      requestData();
    });
  }

  return (
    <>
      <Layout>
        <Header style={{ height: 'auto', }}>
          <Row justify="center">
            <Title style={{ color: 'white' }}>Notes 📝</Title>
          </Row>
        </Header>
        <Divider />
        <Content>
          <NoteModal
            open={editingNote !== undefined}
            edit={editingNote}
            handleOk={handleUpdateNote}
            handleClose={hideModal('edit')}
          />
          <NoteModal
            open={creatingNote}
            handleOk={handleAddNote}
            handleClose={hideModal('create')}
          />
          <Row justify="center">
            <Col xs={15} sm={15} md={15} lg={15} xl={10}>
              {notes.map(
                (note) =>
                  <>
                    <Note
                      id={note.id ?? "0"}
                      title={note.nameTask}
                      description={note.description}
                      handleDelete={handleDeleteNote}
                      handleEdit={handleEditNote}
                    />
                    <Divider />
                  </>
              )}
            </Col>
          </Row>
        </Content>
        <Footer>
          <Row justify="center">
            <Col>
              <Button
                onClick={() => setCreatingNote(true)}
                type="primary"
                size="large"
              >
                Add
              </Button>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
