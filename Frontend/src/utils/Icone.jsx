import {
  IconDeviceLaptop,
  IconKeyboard,
  IconMouse,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconDeviceTv,
} from "@tabler/icons-react";

const ICONES = {
  notebook: IconDeviceLaptop,
  laptop: IconDeviceLaptop,
  teclado: IconKeyboard,
  mouse: IconMouse,
  celular: IconDeviceMobile,
  mobile: IconDeviceMobile,
  periféricos: IconKeyboard,
  "caixa de som": IconDeviceDesktop,
  tv: IconDeviceTv,
};
export default function IconProduto({ produto, ...props }) {
  const chave = produto?.toLowerCase().trim();

  const Icon = ICONES[chave] || IconDeviceDesktop;

  return <Icon {...props} />;
}