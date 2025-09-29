import dns from 'dns';
import os from 'os';

export default function isOnline(){
    const interfaces = os.networkInterfaces();
    const hasNetwork = Object.keys( interfaces ).some( name => 
        interfaces[ name ]?.some( iface => iface.internal === false )
    )

    if( !hasNetwork ) return false;

    return new Promise( resolve => {
        dns.lookup( 'google.com', err => {
            resolve( !err );
        });
    });
}
