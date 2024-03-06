import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
export const config = {
  api: {
    responseLimit: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;
  let htmlData = '<div />';

  const response = await axios.get(url as string);
  if (response.status === 200) {
    htmlData = response.data?.replace(
      '<body>',
      "<style>body.customScroll::-webkit-scrollbar {display: none;}</style><body class='customScroll'>"
    );
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // res.write(a.data.result.html.replaceAll('/flight/ags/bsp.aspx', 'https://www.modetour.com/flight/ags/bsp.aspx'));

  // res.write(a.data.result.html.replaceAll('/flight/ags/bsp.aspx', '/api/asg_bsp'));
  res.write(htmlData);

  res.end();
};

export default handler;
