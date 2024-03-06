import { LoadingOutlined } from "@ant-design/icons";
import { Spin, SpinProps } from "antd";
import { useMainLayoutContext } from "../Head/MainLayoutContext";

const antIcon = <LoadingOutlined spin style={{ fontSize: 36 }} />;
function SpinBase({ children, props }: { children: JSX.Element; props?: SpinProps}) {
    const {isLoading} = useMainLayoutContext();
  return (
    <Spin indicator={antIcon} {...props} spinning={isLoading}>
      {children}
    </Spin>
  );
}
SpinBase.defaultProps = {
  props: undefined,
  loading: false,
};
export default SpinBase;