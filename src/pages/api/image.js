import runMiddleware from '../../utils/runMiddleware';
import multerUpload from '../../utils/multer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const { method } = req;
  console.log('called');
  if (method === 'POST') {
    try {
      await runMiddleware(req, res, multerUpload('profiles'));
      console.log('image uploaded, returning', {
        imgSrc: req.file?.location,
      });
      return res.status(200).json({ imgSrc: req.file?.location });
    } catch (err) {
      console.log('err', err);
      return res.status(500).json({ message: err.message });
    }
  } else {
    return res.status(405).end();
  }
};

export default handler;
