import React, { useState } from 'react';

import SelectList from '../components/common_components/ListModule';
import { SyncFridgePopUp } from '../components/Popup';
import Button from '../components/common_components/ButtonModules';






export default function History() {
    const [isShowSyncFridgePopUp, showSyncFridgePopUpFunction] = useState(false);
    return (
        <div className='container'>
            <SelectList type="history" isShowSyncFridgePopUp={isShowSyncFridgePopUp} />
            {!isShowSyncFridgePopUp && <SyncFridgePopUp />}
        </ div>
    );
}




