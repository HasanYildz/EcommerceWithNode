import React from 'react'

const ProductDescription = () => {
  return (
    <div className='mt-20'>
        <div className='flex gap-3 mb-4'>
            <button className='btn_dark_rounded !rounded-none
            !text-xs !py-[6px] w-36'>Description</button>
            <button className='btn_dark_outline !rounded-none
            !text-xs !py-[6px] w-36'>Care Guide</button>
            <button className='btn_dark_outline !rounded-none
            !text-xs !py-[6px] w-36'>Size Guide</button>
        </div>
        <div className='flex flex-col pb-16'>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas distinctio dicta voluptatibus earum nobis amet, velit facilis blanditiis, illo doloribus reiciendis ipsa dolorum laboriosam, a culpa error veritatis magni facere dolorem esse eligendi ullam molestiae consequuntur? Dolore amet officiis, explicabo nisi ut voluptatem labore natus rem facere, laborum dolorem. Iusto expedita corrupti blanditiis recusandae aut.</p>
            <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, nihil sed rem nesciunt qui a vero autem incidunt consequatur debitis, officia aperiam et quo hic ea laboriosam asperiores inventore architecto deserunt. Architecto dolor, consequuntur consectetur cupiditate voluptate ratione delectus! Itaque ut voluptates maxime dolore, quo nobis laudantium omnis corrupti odit adipisci, perferendis ipsam ea nostrum!</p>
        </div>
    </div>
  )
}

export default ProductDescription