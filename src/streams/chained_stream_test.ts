/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */

import {ChainedStream} from './lazy_iterator';
import {iteratorFromItems} from './lazy_iterator';
import {TestIntegerStream} from './lazy_iterator_test';

const SHORT_STREAM_LENGTH = 15;

describe('ChainedStream', () => {
  it('produces a single underlying stream as expected', done => {
    const chainedStream = ChainedStream.create(
        iteratorFromItems([new TestIntegerStream(SHORT_STREAM_LENGTH)]));

    const expectedResult: number[] = [];
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < SHORT_STREAM_LENGTH; j++) {
        expectedResult[i * SHORT_STREAM_LENGTH + j] = j;
      }
    }

    chainedStream.collectRemaining()
        .then(result => {
          expect(result).toEqual(expectedResult);
        })
        .then(done)
        .catch(done.fail);
  });
  it('produces multiple underlying streams as expected', done => {
    const chainedStream = ChainedStream.create(iteratorFromItems([
      new TestIntegerStream(SHORT_STREAM_LENGTH),
      new TestIntegerStream(SHORT_STREAM_LENGTH),
      new TestIntegerStream(SHORT_STREAM_LENGTH)
    ]));

    const expectedResult: number[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < SHORT_STREAM_LENGTH; j++) {
        expectedResult[i * SHORT_STREAM_LENGTH + j] = j;
      }
    }

    chainedStream.collectRemaining()
        .then(result => {
          expect(result).toEqual(expectedResult);
        })
        .then(done)
        .catch(done.fail);
  });
});
