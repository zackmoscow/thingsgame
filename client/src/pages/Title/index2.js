import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../actions/actions';

export default function Title() {

  const dispatch = useDispatch();
  const error = useSelector(state => state.error);

}