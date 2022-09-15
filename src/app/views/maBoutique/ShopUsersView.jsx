import React from 'react';
import ProductsFromUser from '../../components/ProductsFromUser';
import ShopUsers from '../../components/ShopUsers';

const ShopUsersView = () => {
    return (
        <div>
            <ShopUsers />
            <ProductsFromUser />
        </div>
    );
};

export default ShopUsersView;
