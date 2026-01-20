export default interface IPCResult<T>{
    success: boolean;
    value: T,
    errMessage?: string;
}
