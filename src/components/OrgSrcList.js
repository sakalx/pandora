import React from 'react';

const OrgSrcList = ({sources}) =>
  sources.map(({url, title, sentences}, i) =>

    <section key={i.toString()} className={'query-item'}>
      <h5>Sentences: {sentences.map(num => num + 1).join(', ')}</h5>
      <a className='link' style={{flex: 1}}
         href={url} target='_blank'>
        {title}
      </a>
      <button className='homeBtn' onClick={() => window.open(url, '_blank')}>
        Open
      </button>
    </section>);

export default OrgSrcList;