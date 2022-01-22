import * as React from 'react';
import ProductHowItWorks from '../components/HowItWorks';
import AppBar from '../components/AppBar';
import MapView from '../components/MapView';
import AppFooter from '../components/AppFooter';
import withRoot from '../modules/withRoot';

function Index() {
    return (
        <React.Fragment>
            <AppBar />
            <MapView />
            <ProductHowItWorks />
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(Index);
