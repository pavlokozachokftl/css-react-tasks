import React, {Component} from 'react';
import 'semantic-ui-css/semantic.css';
import styles from './App.module.css';

import AddBlockForm from './components/pages/AddBlockForm';

class App extends Component {
    render() {
        return (
            <div className={styles.App}>
                <AddBlockForm/>
            </div>
        );
    }
}

export default App;
