
import LoadingOverlay from 'react-loading-overlay'


function Loader({ loading, children }) {

    return (

        <LoadingOverlay
            active={loading}
            spinner
            text='Loading your content...'
        >
            {children}
        </LoadingOverlay>

    );
}

export default Loader;