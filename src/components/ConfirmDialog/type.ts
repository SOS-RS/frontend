export interface IConfirmDialog {
    variant: any
    label: string
    title: string
    description: string
    labelOnConfirm: string
    labelOnCancel: string
    onClickConfirm: (() => void) | undefined
}