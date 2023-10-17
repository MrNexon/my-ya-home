export class BytePackage {
  private readonly result: Buffer;

  constructor(deviceId: number, buffer: Buffer, sync?: boolean) {
    const newBuff = Buffer.alloc(buffer.byteLength + 2);
    newBuff.writeUint8(deviceId);
    newBuff.writeUint8(sync ? 255 : 0, 1);
    newBuff.fill(buffer, 2);
    this.result = newBuff;
  }

  public render() {
    return this.result;
  }
}
