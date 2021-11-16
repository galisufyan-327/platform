//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import type {
  AttachedDoc,
  Class,
  Data,
  Doc,
  DocumentUpdate,
  ExtendedAttributes,
  Mixin,
  PropertyType,
  Ref,
  Space,
  Tx,
  TxBulkWrite,
  TxCollectionCUD,
  TxCreateDoc,
  TxCUD,
  TxMixin,
  TxPutBag,
  TxRemoveDoc,
  TxUpdateDoc
} from '@anticrm/core'
import { DOMAIN_TX } from '@anticrm/core'
import { Model } from '@anticrm/model'
import core from './component'
import { TDoc } from './core'

// T R A N S A C T I O N S

@Model(core.class.Tx, core.class.Doc, DOMAIN_TX)
export class TTx extends TDoc implements Tx {
  objectSpace!: Ref<Space>
}

@Model(core.class.TxCUD, core.class.Tx)
export class TTxCUD<T extends Doc> extends TTx implements TxCUD<T> {
  objectId!: Ref<T>
  objectClass!: Ref<Class<T>>
}

@Model(core.class.TxCreateDoc, core.class.TxCUD)
export class TTxCreateDoc<T extends Doc> extends TTxCUD<T> implements TxCreateDoc<T> {
  attributes!: Data<T>
}

@Model(core.class.TxCollectionCUD, core.class.TxCUD)
export class TTxCollectionCUD<T extends Doc, P extends AttachedDoc> extends TTxCUD<T> implements TxCollectionCUD<T, P> {
  collection!: string
  tx!: TxCUD<P>
}

@Model(core.class.TxPutBag, core.class.TxCUD)
export class TTxPutBag<T extends PropertyType> extends TTxCUD<Doc> implements TxPutBag<T> {
  bag!: string
  key!: string
  value!: T
}

@Model(core.class.TxMixin, core.class.TxCUD)
export class TTxMixin<D extends Doc, M extends D> extends TTxCUD<D> implements TxMixin<D, M> {
  mixin!: Ref<Mixin<M>>
  attributes!: ExtendedAttributes<D, M>
}

@Model(core.class.TxUpdateDoc, core.class.TxCUD)
export class TTxUpdateDoc<T extends Doc> extends TTxCUD<T> implements TxUpdateDoc<T> {
  operations!: DocumentUpdate<T>
}

@Model(core.class.TxRemoveDoc, core.class.TxCUD)
export class TTxRemoveDoc<T extends Doc> extends TTxCUD<T> implements TxRemoveDoc<T> {
}

@Model(core.class.TxBulkWrite, core.class.Tx)
export class TTxBulkWrite extends TTx implements TxBulkWrite {
  txes!: TxCUD<Doc>[]
}
