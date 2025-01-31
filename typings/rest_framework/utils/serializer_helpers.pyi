"""
This type stub file was generated by pyright.
"""

import sys
from collections.abc import MutableMapping

class ReturnDict(dict):
    """
    Return object from `serializer.data` for the `Serializer` class.
    Includes a backlink to the serializer instance for renderers
    to use if they need richer field information.
    """
    def __init__(self, *args, **kwargs) -> None:
        ...
    
    def copy(self): # -> ReturnDict:
        ...
    
    def __repr__(self): # -> str:
        ...
    
    def __reduce__(self): # -> tuple[type[dict[Any, Any]], tuple[dict[Any, Any]]]:
        ...
    
    if sys.version_info >= (3, 9):
        def __or__(self, other): # -> _NotImplementedType | Self:
            ...
        
        def __ror__(self, other): # -> _NotImplementedType | Self:
            ...
        


class ReturnList(list):
    """
    Return object from `serializer.data` for the `SerializerList` class.
    Includes a backlink to the serializer instance for renderers
    to use if they need richer field information.
    """
    def __init__(self, *args, **kwargs) -> None:
        ...
    
    def __repr__(self): # -> str:
        ...
    
    def __reduce__(self): # -> tuple[type[list[Any]], tuple[list[Any]]]:
        ...
    


class BoundField:
    """
    A field object that also includes `.value` and `.error` properties.
    Returned when iterating over a serializer instance,
    providing an API similar to Django forms and form fields.
    """
    def __init__(self, field, value, errors, prefix=...) -> None:
        ...
    
    def __getattr__(self, attr_name): # -> Any:
        ...
    
    def __repr__(self): # -> str:
        ...
    
    def as_form_field(self): # -> Self:
        ...
    


class JSONBoundField(BoundField):
    def as_form_field(self): # -> Self:
        ...
    


class NestedBoundField(BoundField):
    """
    This `BoundField` additionally implements __iter__ and __getitem__
    in order to support nested bound fields. This class is the type of
    `BoundField` that is used for serializer fields.
    """
    def __init__(self, field, value, errors, prefix=...) -> None:
        ...
    
    def __iter__(self): # -> Generator[NestedBoundField | JSONBoundField | BoundField, Any, None]:
        ...
    
    def __getitem__(self, key): # -> NestedBoundField | JSONBoundField | BoundField:
        ...
    
    def as_form_field(self): # -> Self:
        ...
    


class BindingDict(MutableMapping):
    """
    This dict-like object is used to store fields on a serializer.

    This ensures that whenever fields are added to the serializer we call
    `field.bind()` so that the `field_name` and `parent` attributes
    can be set correctly.
    """
    def __init__(self, serializer) -> None:
        ...
    
    def __setitem__(self, key, field): # -> None:
        ...
    
    def __getitem__(self, key):
        ...
    
    def __delitem__(self, key): # -> None:
        ...
    
    def __iter__(self): # -> Iterator[Any]:
        ...
    
    def __len__(self): # -> int:
        ...
    
    def __repr__(self): # -> str:
        ...
    


