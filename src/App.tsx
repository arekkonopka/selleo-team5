import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import React from 'react';
import { Authenticated, Unauthenticated } from './views';

export class App extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <Router>
                <Switch>
                    <Route path="/auth">
                        <Unauthenticated/>
                    </Route>
                </Switch>

                <Switch>
                    <Route exact path="/">
                        <Authenticated/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
