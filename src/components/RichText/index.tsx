import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState, defaultColors,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import type {Prettify} from "ts-essentials";
import type {PropertiesHyphenFallback} from "csstype";
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

type StyleObject = Prettify<{
  [K in keyof PropertiesHyphenFallback]?: Extract<PropertiesHyphenFallback[K], string> | undefined;
}>;
type StateValues = {
  [stateValue: string]: {
    css: StyleObject;
    label: string;
  };
};
type TextStateFeatureProps = {
  state: {
    [stateKey: string]: StateValues;
  };
};

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/noter/${slug}` : `/${slug}`
}

const colorState: TextStateFeatureProps["state"] = {
  color: {
    ...defaultColors.text,
    // fancy gradients!
    galaxy: { label: 'Galaxy', css: { background: 'linear-gradient(to right, #0000ff, #ff0000)', color: 'white' } },
    sunset: { label: 'Sunset', css: { background: 'linear-gradient(to top, #ff5f6d, #6a3093)' } },
  },
  background: {
    ...defaultColors.background,
  },
  // You can have both colored and underlined text at the same time.
  // If you don't want that, you should group them within the same key.
  // (just like I did with defaultColors and my fancy gradients)
  underline: {
    'solid': { label: 'Solid', css: { 'text-decoration': 'underline', 'text-underline-offset': '4px' } },
    // You'll probably want to use the CSS light-dark() utility.
    'yellow-dashed': { label: 'Yellow Dashed', css: { 'text-decoration': 'underline dashed', 'text-decoration-color': 'light-dark(#EAB308,yellow)', 'text-underline-offset': '4px' } },
  },
}

type ExtractAllColorKeys<T> = {
  [P in keyof T]: T[P] extends StateValues ? keyof T[P] : never
}[keyof T]

type ColorStateKeys = ExtractAllColorKeys<typeof colorState>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="p-8 blocks"
        imgClassName="m-1"
        {...node.fields}
        captionClassName="mx-auto"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
  text: ({node}) => {
    const styles: React.CSSProperties = {}

    let text: React.ReactNode = node.text

    if (node.$) {
      Object.entries(colorState).forEach(([stateKey, stateValues]) => {
        const stateValue = node.$ && (node.$[stateKey] as ColorStateKeys)

        if (stateValue && stateValues[stateValue]) {
          Object.assign(styles, stateValues[stateValue].css)
        }
      })
    }
    if (node.$) {
      text = <span style={styles}>{text}</span>
    }
    return text
  }
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
      <>
        <ConvertRichText
          converters={jsxConverters}
          className={cn(
            'payload-richtext',
            {
              container: enableGutter,
              'max-w-full': !enableGutter,
              'mx-auto prose md:prose-md dark:prose-invert max-w-full': enableProse,
            },
            className,
          )}
          {...rest}
        />
    </>
  )
}
