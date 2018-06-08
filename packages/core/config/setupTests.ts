import Enzyme from '@pisano/enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@pisano/enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
