import Vue from "vue";
import {
  Button,
  DatePicker,
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Popconfirm,
  Input,
  Select,
  Option,
  Table,
  TableColumn,
  Tabs,
  Form,
  Tooltip,
  Upload,
  Radio,
  RadioGroup,
  FormItem,
  Checkbox,
  Slider,
  CheckboxButton,
  CheckboxGroup,
  TabPane,
  Loading,
  Progress,
  MessageBox,
  Message,
  Row,
  Col,
  ButtonGroup
} from "element-ui";

Vue.use(ButtonGroup);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Radio);
Vue.use(Popover);
Vue.use(Popconfirm);
Vue.use(RadioGroup);
Vue.use(Option);
Vue.use(Form);
Vue.use(Tooltip);
Vue.use(Checkbox);
Vue.use(Progress);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(Slider);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(Row);
Vue.use(Col);
Vue.use(TabPane);

// TODO
// fix bug https://github.com/ElementUI/babel-plugin-component/issues/31
const _Loading = Loading;
const { directive: loadingDirective, service: loadingService } = _Loading;
const _MessageBox = MessageBox;
const { alert, confirm, prompt } = _MessageBox;

Vue.use(loadingDirective);

Vue.prototype.$loading = loadingService;
Vue.prototype.$msgbox = _MessageBox;
Vue.prototype.$alert = alert;
Vue.prototype.$confirm = confirm;
Vue.prototype.$prompt = prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
