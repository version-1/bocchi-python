import React, { ReactNode, useState, useEffect } from 'react'
import { Modal } from 'antd'

interface ShowParams {
  title: string
  component: ReactNode | ReactNode[]
  [key: string]: any
}

type ShowFunc = (params: ShowParams) => void
type HideFunc = () => void

interface ModalFunc {
  show: ShowFunc
  hide: HideFunc
}

let content: ReactNode | ReactNode[] = <></>

/* eslint-disable */
export let show: ShowFunc = () => undefined
export let hide: HideFunc = () => undefined
/* eslint-enable */

const ModalComponent: React.FC<any> & ModalFunc = () => {
  const [visible, setVisible] = useState(false)
  const [restProps, setRestProps] = useState<any>({})
  const [displayTitle, setDisplayTitle] = useState('')
  useEffect(() => {
    show = ({ title, component, ...rest }: ShowParams): void => {
      content = component
      setVisible(true)
      setDisplayTitle(title)
      setRestProps(rest as any)
    }
    hide = (): void => {
      setVisible(false)
    }
    ModalComponent.show = show
    ModalComponent.hide = hide
  }, [visible])

  if (!visible) {
    return <></>
  }

  const displayCancelText = restProps.cancelText || 'キャンセル'

  return (
    <Modal
      onCancel={ModalComponent.hide}
      destroyOnClose
      footer={null}
      {...restProps}
      cancelText={displayCancelText}
      title={displayTitle}
      visible={visible}
    >
      {content}
    </Modal>
  )
}

ModalComponent.show = show
ModalComponent.hide = hide

export default ModalComponent
