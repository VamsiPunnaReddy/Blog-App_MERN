import ReactQuill from 'react-quill';

export function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
  };


  return (<>
    <div className="col-span-2 ">
      <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules}
        className='h-44 md:h-72 mb-16 sm:mb-10 md:mb-8 ' />
    </div>
  </>);
}