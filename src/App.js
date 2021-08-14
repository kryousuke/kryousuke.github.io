import logo from './logo.svg';
import './App.css';

import { Book } from './Components/book';
import { Page } from './Components/page';

function App() {
  return (
    <div className="App">
      <Book>
        <Page>
          hello world
        </Page>
        <Page>
          About Me
        </Page>
        <Page>
          Python
        </Page>
        <Page>
          Books
        </Page>
      </Book>
    </div>
  );
}

export default App;
