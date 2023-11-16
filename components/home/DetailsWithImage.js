import React from 'react'
import LeftText from './LeftText'
import RightText from './RightText'
import NoMoney from "./../../public/assets/images/noMoney.png"
import LogoRect from "./../../public/assets/images/squareLogo.png"

function DetailsWithImage() {
    return (
        <>
            <RightText 
            image={LogoRect} 
            alt="No Money" 
            heading="Donation Needs No Money!!!"
            description="Fortunate Folks will prove it that money does’nt buy happiness and donation don’t need money but willingness to contribute a peice of self to the society.
            We believe that everyone is blessed with one nor the other skills. Then why not SHARE these skills with the underprivilegded one?"
            />
            <LeftText 
            image={NoMoney} 
            alt="Unity Is strength" 
            heading="Unity Is strength"
            description="The Core of our values are built in the childhood itself. Our interests always was inclined towards stories. The story which made a high impact was UNITED WE STAND DIVIDED WE FALL. Fortunate folks is all about bringing the best in the society together and be the change we want to see. "
            />
        </>
    )
}

export default DetailsWithImage
