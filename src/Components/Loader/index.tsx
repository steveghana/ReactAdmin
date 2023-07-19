import { Loader } from '../../assets/logo';

const CustomLoader = () => {
    return (
        <div
            style={{
                width: '100%',
                position: 'absolute',
                height: '100%',
                inset: '0 0 0 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Loader />
        </div>
    );
};

export default CustomLoader;
